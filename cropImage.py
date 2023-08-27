from PIL import Image

# Open the image
image_path = "1.jpg"  # Replace with the actual path of your image
image = Image.open(image_path)

# Get the width and height of the image
width, height = image.size

# Calculate the dimensions for the left half of the image
left_half_width = width // 2
left_half_box = (0, 0, left_half_width, height)

# Crop the left half of the image
left_half_image = image.crop(left_half_box)

# Display or save the modified image
left_half_image.show()  # Display the modified image
left_half_image.save("modified_image.jpg")  # Save the modified image