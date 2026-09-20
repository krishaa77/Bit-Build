from . import mock_data

def list_bins():
    return mock_data.get_bins()

def get_bin(bin_id: str):
    for b in list_bins():
        if b["bin_id"] == bin_id:
            return b
    return None

def list_vehicles():
    return mock_data.get_vehicles()
