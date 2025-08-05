import json
import os


def compare_files_in_paths(paths, expected_paths):
    for path, expected_path in zip(paths, expected_paths):
        file_paths = scan_sub_dirs(path)
        expected_file_paths = scan_sub_dirs(expected_path)
        assert len(file_paths) > 0
        assert len(expected_file_paths) > 0
        for file_path, expected_file_path in zip(scan_sub_dirs(path), scan_sub_dirs(expected_path)):
            compare_json_files(file_path, expected_file_path)


def scan_sub_dirs(path):
    paths = []
    for entry in os.scandir(path):
        if entry.is_dir():
            paths += scan_sub_dirs(entry.path)
        else:
            paths.append(entry.path)
    return paths


def compare_json_files(file_one, file_two):
    with open(file_one) as output_file:
        with open(file_two) as expected_output_file:
            output = json.load(output_file)
            expected_output = json.load(expected_output_file)
            assert output == expected_output
