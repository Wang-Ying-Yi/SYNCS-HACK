from PIL import Image
import os

def make_similar_colors_transparent(input_file, background_color, similarity_threshold=100):
    img = Image.open(input_file)
    rgba = img.convert("RGBA")
    datas = rgba.getdata()

    newData = []
    for item in datas:
        # Calculate the Euclidean distance between the pixel color and background color
        color_distance = sum((item[i] - background_color[i]) ** 2 for i in range(3)) ** 0.5

        # If the color distance is within the similarity threshold, make the pixel transparent
        if color_distance <= similarity_threshold:
            newData.append((0, 0, 0, 0))  # Transparent pixel
        else:
            newData.append(item)  # Other colors remain unchanged

    rgba.putdata(newData)
    new_file = input_file.replace("./formal", "")
    os.makedirs("test", exist_ok=True)
    rgba.save(f"test/{new_file}", "PNG")
    img.close()

# Call the function with the input image path, background color, and similarity threshold
folder_path = "./formal"

# Iterate over all file paths in the folder
for filename in os.listdir(folder_path):
    file_path = os.path.join(folder_path, filename)
    background_color = (255, 255, 255)  # Replace with the approximate background color
    color_similarity_threshold = 16  # Adjust this threshold based on your need
    make_similar_colors_transparent(file_path, background_color, color_similarity_threshold)