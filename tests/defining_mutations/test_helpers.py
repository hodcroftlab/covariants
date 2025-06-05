import numpy as np

from scripts.defining_mutations.helpers import replace_list_of_empty_string


def test_remove_empty_strings():
    assert replace_list_of_empty_string(['']) == []
    assert replace_list_of_empty_string([]) == []
    assert replace_list_of_empty_string(['hello']) == ['hello']
    assert replace_list_of_empty_string(['hello', 'goodbye']) == ['hello', 'goodbye']
    assert replace_list_of_empty_string('') == ''
    assert replace_list_of_empty_string('hello') == 'hello'
    assert replace_list_of_empty_string(np.array([''])) == []
    assert replace_list_of_empty_string(np.array(['hello'])) == np.array(['hello'])