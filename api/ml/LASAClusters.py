import os
import pathlib
import pandas as pd
import numpy as np
import sklearn as sk
from sklearn.cluster import KMeans, AffinityPropagation
import matplotlib.pyplot as plt
import nltk
from nltk.metrics.distance import edit_distance
from tqdm.notebook import tqdm
import pickle
import string
import sys, math, random, copy

class LASAClusters:
    """Computes LASA clusters."""

    @staticmethod
    def compute_clusters(result=dict()):
        # Calculate similarity matrix between letters
        # Adapted from Samuelsson, made for Spotify
        # Neighbors are currently chosen by phonetic experimentation
        current_path = str(pathlib.Path().resolve())
        df = pd.read_csv(current_path + '/ml/Products.txt', sep='\t+', engine='python')
  
        drugNames = df['DrugName']
        drugNames = drugNames.drop_duplicates().dropna()
        random_incides = [np.random.randint(0, len(drugNames)) for _ in range(10)]
        drugNames.iloc[random_incides]
        
        names = np.array(drugNames)
        lasa_names = np.unique(np.loadtxt(current_path + "/ml/lists_LASA/sa_ISMP+FDA.txt", dtype=str))
        names = np.append(lasa_names, names)
        # names = [each_string.lower() for each_string in names]
        
        # Calculate similarity matrix between letters
        # Adapted from Samuelsson, made for Spotify
        # Neighbors are currently chosen by phonetic experimentation
        neighbors_of = {}
        neighbors_of['q'] = ['w', 'c', 'k']
        neighbors_of['w'] = ['v', 'u']
        neighbors_of['e'] = ['i', 'y', 'a']
        neighbors_of['r'] = ['t', 'f', 'd', 'e']
        neighbors_of['t'] = ['d', 'f', 'r', 'v', 'p']
        neighbors_of['y'] = ['i', 'e', 'a', 'u']
        neighbors_of['u'] = ['i', 'y', 'o', 'a', 'e', 'w']
        neighbors_of['i'] = ['e', 'y', 'u']
        neighbors_of['o'] = ['e', 'u']
        neighbors_of['p'] = ['l', 'o', 't']
        neighbors_of['a'] = ['e', 'i', 'u', 'y']
        neighbors_of['s'] = ['x', 'z', 'c']
        neighbors_of['d'] = ['b', 'f', 't', 'p']
        neighbors_of['f'] = ['v', 'd', 't']
        neighbors_of['g'] = ['j', 'h', 'q']
        neighbors_of['h'] = ['f', 'g']
        neighbors_of['j'] = ['g', 'c']
        neighbors_of['k'] = ['c', 'q']
        neighbors_of['l'] = ['m', 'n']
        neighbors_of['z'] = ['s', 'x', 'c']
        neighbors_of['x'] = ['s', 'c', 'z', 'k']
        neighbors_of['c'] = ['k', 's']
        neighbors_of['v'] = ['f', 'b', 'c', 'w']
        neighbors_of['b'] = ['g', 'n', 'v', 'd']
        neighbors_of['n'] = ['m', 'b']
        neighbors_of['m'] = ['b', 'n']

        keys = sorted(neighbors_of.keys())
        dists = {el:{} for el in keys}

        # Distance between letters and their neighbours
        def distance(start, end, raw):
            if start == end:
                if raw:
                    return 0
                else:
                    return 1
                
            visited = [start]
            queue = []
            
            for key in neighbors_of[start]:
                queue.append({'char': key, 'dist': 1})
                
            while True:
                key = queue.pop(0)
                visited.append(key['char'])
                if key['char'] == end:
                    return key['dist']
                
                for neighbor in neighbors_of[key['char']]:
                    if neighbor not in visited:
                        queue.append({'char': neighbor, 'dist': key['dist']+1})

        # Computes a similarity matrix for letters of the English alphabet
        # Inspired by the keyboard distances research of Samuelsson for Spotify
        def alldists(option, verbose):          
            if option == "raw":
                longest_dist = 0
                avgdist = 0
                for i in range(len(keys)):
                    for j in range(len(keys)):
                        dists[keys[i]][keys[j]] = distance(keys[i], keys[j], True)
                        avgdist += dists[keys[i]][keys[j]]
                        if dists[keys[i]][keys[j]] > longest_dist:
                            longest_dist = dists[keys[i]][keys[j]]
                key_dist = longest_dist
                avgdist /= len(keys) ** 2 + 0.0
                
                buckets = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                
                for i in range(len(keys)):
                    for j in range(len(keys)):
                        buckets[dists[keys[i]][keys[j]]] += 1
                if verbose:
                    print("Average distance: " + str(avgdist))
                    print("Longest distance: " + str(key_dist))
                    print("Buckets: " + str(buckets))
                    print(str(dists).replace("'", '"'))
            return copy.deepcopy(dists)

        # Take all ascii characters
        all_ascii = string.printable

        # Add the manually computed Edit Distance for letters to the full similarity matrix
        # Add hardcoded similarity for the other characters (0 if same character, 12 otherwise)
        similarity_dict = alldists("raw", False)
        similarity_dict_all = {}

        # Construct full similarity matrix by iterating through all ascii characters
        for a in all_ascii:
            similarity_dict_all[a] = {}
            for b in all_ascii:
                # If characters are the same, assign 0
                # Otherwise if similarity has alredy been computed, assign that value
                # Otherwise assign 12      
                similarity_dict_all[a][b] = (0 if a == b else similarity_dict[a][b] if a in similarity_dict and b in similarity_dict[a] else 12)
        similarity_array = np.zeros((len(similarity_dict), len(similarity_dict)))

        for character_index, (character, other_characters) in enumerate(similarity_dict.items()):
            for c_index, c in enumerate(other_characters.values()):
                similarity_array[character_index][c_index] = c

        ins_cost = 3
        del_cost = 4

        def edit_distance_dp(seq1, seq2):
            # There is no difference between upper and lower case for this application    
            seq1 = seq1.lower()
            seq2 = seq2.lower()
            
            # Create an empty 2D matrix to store cost
            cost = np.zeros((len(seq1)+1, len(seq2)+1))
            
            # Fill the first row
            cost[0] = [i for i in range(len(seq2)+1)]
            
            # Fill the first column
            cost[:, 0] = [i for i in range(len(seq1)+1)]
            
            # Iterate over earch row and column
            for row in range(1, len(seq1)+1):
                
                for col in range(1, len(seq2)+1):
                    
                    # If both the characters are same then the cost will be same as 
                    # the cost of the previous sub-sequence
                    if seq1[row-1] == seq2[col-1]:
                        cost[row][col] = cost[row-1][col-1]
                    else:
                        
                        insertion_cost = cost[row][col-1] + ins_cost
                        deletion_cost = cost[row-1][col] + del_cost
                        substitution_cost = cost[row-1][col-1] + similarity_dict_all[seq1[row-1]][seq2[col-1]]
        #                 print(f"sim for {seq1[row-1]} and {seq2[col-1]}: {similarity_dict_all[seq1[row-1]][seq2[col-1]]}")
                        
                        # Calculate the minimum cost
                        cost[row][col] = min(insertion_cost, deletion_cost, substitution_cost)
                        
            return cost[len(seq1), len(seq2)]

        file_path = current_path + '/ml/lev_dist.pickle'

        if os.path.isfile(file_path):
            lev_dist = pickle.load(open(file_path, "rb"))

        else:
            # Levenshtein distance
            # n = len(names)
            n = 1000
            lev_dist = np.zeros((n, n))
            lev_sim = np.zeros((n, n))

            for i in tqdm(range(n)):
                for j in range(i+1, n):
                    ni = names[i]
                    nj = names[j]
                    dist = edit_distance_dp(ni, nj)
                    lev_dist[i, j] = dist
                    lev_dist[j, i] = dist
                    
            pickle.dump(lev_dist, open(file_path, "wb"))

        # Distance to similarity
        lev_sim = 1 / (1 + lev_dist)

        # Cluster on computed similarities
        aff_prop = AffinityPropagation(affinity="precomputed", damping=0.96,max_iter = 10000, verbose=True)
        aff_prop.fit(lev_sim)
        print(f'Found {len(aff_prop.cluster_centers_indices_)} clusters.')

        clusters = dict()
        all_clusters = dict()
        all_LASA = []
        t=7
        for cluster_id in range(len(aff_prop.cluster_centers_indices_)):
            exemplar = names[aff_prop.cluster_centers_indices_[cluster_id]]
            member_ind = np.nonzero(aff_prop.labels_ == cluster_id)
            members = names[member_ind]
            most_similar_members = set()
            # For each member (member index) of the cluster, check if it is similar enough to the rest     
            for member in member_ind[0]:
                for datapoint in range(len(lev_dist)):
                    # Omit the distance to the point itself and if it does not have distances below threshold,
                    # remove it, probably not LASA
                    if (member != datapoint and lev_dist[member][datapoint] < t):
                        most_similar_members.add(names[member])
                most_similar_members.add(exemplar)
                        
            if len(most_similar_members) > 1:
                clusters[cluster_id] = most_similar_members
                all_LASA.append(list(most_similar_members))
                print(f'\033[1m{exemplar}\033[0m ({len(most_similar_members)} most similar from {len(members)} total): {", ".join(most_similar_members)}')

            all_clusters[cluster_id] = members

        return clusters, all_LASA, all_clusters