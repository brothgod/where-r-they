# python script to make file size of images smaller

from PIL import Image
import os

def compress_images(input_folder, output_folder, quality=75):
    # Create output folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Get a list of image files in the input folder
    image_files = [f for f in os.listdir(input_folder) if f.endswith(('.jpg', '.jpeg', '.png', '.bmp'))]

    # Process each image
    for image_file in image_files:
        input_path = os.path.join(input_folder, image_file)
        output_path = os.path.join(output_folder, image_file)

        # Compress image
        print("compressing", input_path)
        compress_image(input_path, output_path, quality)

        print(f"Compressed: {image_file} => Saved as: {output_path}")

def compress_image(input_path, output_path, quality=85):
    # Open the image
    image = Image.open(input_path)

    # Save the image with compression
    image.save(output_path, quality=quality)

    return output_path

# Example usage
input_folder = "images"
output_folder = "compressed-images"
compress_images(input_folder, output_folder, 40)
