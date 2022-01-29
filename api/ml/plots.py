import matplotlib.pyplot as plt

x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
y = [0, 17, 17, 25, 55, 131, 226, 371, 592, 694, 769, 817, 842, 867, 887, 901, 922, 936, 943, 958, 960]

z = [y[i]-y[i-1] if i > 0 else 0 for i in range( len(y))]

fig, axs = plt.subplots(2)
axs[0].plot(x, y, marker="o", color="black")
axs[1].plot(x, z, color="black")
plt.setp(axs, xlabel=r"Threshold $t$")
plt.setp(axs[0], ylabel="# of points kept in clusters")
plt.setp(axs[1], ylabel=r"# of points kept in clusters at $t_i$ - at $t_{i-1}$")
plt.show()