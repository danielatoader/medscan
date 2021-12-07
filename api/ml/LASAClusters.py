import pandas as pd
import pickle
import numpy as np
import sklearn as sk
import pathlib
from sklearn.cluster import KMeans, AffinityPropagation
import matplotlib.pyplot as plt
import nltk
from nltk.metrics.distance import edit_distance
from tqdm.notebook import tqdm

class LASAClusters:

    @staticmethod
    def compute_clusters(result=dict()):

        current_path = str(pathlib.Path().resolve())
        df = pd.read_csv(current_path + '/ml/Products.txt', sep='\t+', engine='python')
  
        drugNames = df['DrugName']
        drugNames = drugNames.drop_duplicates().dropna()
        random_incides = [np.random.randint(0, len(drugNames)) for _ in range(10)]
        drugNames.iloc[random_incides]
        names = np.array(drugNames)

        # Levenshtein distance
        # n = len(names)
        # n = 3000
        # lev_dist = np.zeros((n, n))
        # for i in tqdm(range(n)):
        #     for j in range(i + 1, n):
        #         dist = edit_distance(names[i], names[j])
        #         lev_dist[i, j] = lev_dist[j, i] = dist

        file_path = current_path + '/ml/lev_dist3000.pickle'
        # pickle.dump(lev_dist, open(file_path, "wb"))
        lev_dist = pickle.load(open(file_path, "rb"))

        # Distance to similarity
        # Try out other ways to translate distance to similarity
        lev_sim = 1 / (1 + lev_dist)

        # Cluster on computed similarities
        aff_prop = AffinityPropagation(affinity="precomputed", damping=0.96, verbose=True)
        aff_prop.fit(lev_sim)
        print(f'Found {len(aff_prop.cluster_centers_indices_)} clusters.')

        for cluster_id in range(len(aff_prop.cluster_centers_indices_)):
            exemplar = names[aff_prop.cluster_centers_indices_[cluster_id]]
            members = names[np.nonzero(aff_prop.labels_ == cluster_id)]

            print(f'{cluster_id + 1}. \033[1m{exemplar}\033[0m ({len(members)} members): {", ".join(members)}')        
            result[exemplar] = list(members)     
        
        return result
