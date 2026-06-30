import os
import numpy as np
import rasterio
from rasterio.transform import from_origin

def create_geospatial_mock_asset(output_filepath, bands_count, baseline_lat, baseline_lon):
    os.makedirs(os.path.dirname(output_filepath), exist_ok=True)
    width, height = 10, 10
    
    # Creates a 2-degree bounding box around your location coordinates
    transform = from_origin(baseline_lon - 1.0, baseline_lat + 1.0, 0.2, 0.2)
    
    try:
        with rasterio.open(
            output_filepath, 'w',
            driver='GTiff',
            height=height, width=width,
            count=bands_count,
            dtype=rasterio.float32,
            crs='+proj=longlat +datum=WGS84 +no_defs',
            transform=transform
        ) as dst:
            for band in range(1, bands_count + 1):
                mock_data_matrix = np.random.uniform(0.1, 0.9, (height, width)).astype(np.float32)
                dst.write(mock_data_matrix, band)
        print(f"--> GeoTIFF created successfully: {output_filepath}")
    except Exception as e:
        print(f"Raster creation failed: {e}")

if __name__ == "__main__":
    # Baseline coordinates for testing (Defaults to typical India testing parameters)
    TEST_LAT = 17.3850
    TEST_LON = 78.4867
    
    create_geospatial_mock_asset(os.path.join("data", "sentinel2", "sample_optical.tif"), 2, TEST_LAT, TEST_LON)
    create_geospatial_mock_asset(os.path.join("data", "sentinel1", "sample_sar.tif"), 1, TEST_LAT, TEST_LON)