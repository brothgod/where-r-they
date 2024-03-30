# python script to rename multiple file names at once 
# change "substring_to_remove = ____"

import os

def remove_substring_from_filenames(folder_path, substring):
    # Get a list of all files in the folder
    files = os.listdir(folder_path)

    # Iterate over each file
    for filename in files:
        # Construct the old and new filenames
        old_filepath = os.path.join(folder_path, filename)
        new_filename = filename.replace(substring, "")
        new_filepath = os.path.join(folder_path, new_filename)

        # Rename the file
        os.rename(old_filepath, new_filepath)
        print(f"Renamed {filename} to {new_filename}")

# Example usage
folder_path = "images"
substring_to_remove = "%2"
remove_substring_from_filenames(folder_path, substring_to_remove)