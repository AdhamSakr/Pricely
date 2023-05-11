import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Camera } from "expo-camera";

import Error from "../components/Error";
import Loading from "../components/Loading";

function CameraScreen({ navigation }) {
  const [isStartCamera, setStartCamera] = useState(false);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  let camera;

  useEffect(() => {
    const getCameraPermission = async () => {
      console.log("Beginning of getCameraPermission function");
      try {
        // Get permission to access camera.
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        setStartCamera(cameraPermission.granted);
        if (!cameraPermission.granted) {
          console.log("Camera permission not granted !");
          navigation.navigate("HomeScreen");
        }
      } catch (error) {
        setError(true);
        console.log(error);
      }

      console.log("End of getCameraPermission function");
    };

    getCameraPermission();
  }, []);

  const takePicture = async () => {
    console.log("Beginning of takePicture function");
    try {
      if (camera) {
        // Reduce quality to reduce size of image taken for performance.
        const photoOptions = { quality: 0.5, base64: true };
        const photo = await camera.takePictureAsync(photoOptions);
        const data = new FormData();
        data.append("image", {
          uri: photo.uri, // expo-camera saves the photo to the app's cache.
          type: "image/jpeg",
        });
        const options = {
          method: "POST",
          headers: {
            "X-RapidAPI-Key":
              "803d2a3700mshd6950d3a60d02e5p1ea178jsn312b100485f2",
            "X-RapidAPI-Host": "general-detection.p.rapidapi.com",
          },
          body: data,
        };

        console.log("Before fetching response from API");
        setLoading(true);
        const response = await fetch(
          "https://general-detection.p.rapidapi.com/v1/results?algo=algo1",
          options
        );
        console.log("After fetching response API");

        const detectedObjects = await response.json();
        setLoading(false);
        console.log(detectedObjects.results);
        if (detectedObjects.results[0].status.code != "ok") {
          setError(true);
        } else {
          // Detected objects are sorted by the API descendingly in terms of confidence coeffecient.
          // So it should be okay to just grab the first detected object from the response json.
          const detectedObject = Object.keys(
            detectedObjects.results[0]?.entities[0]?.objects[0]?.entities[0]
              ?.classes
          )[0];
          console.log("Object detected by API:");
          console.log(detectedObject);
          console.log("Navigating to SearchResultsScreen");
          navigation.navigate("SearchResultsScreen", { detectedObject });
        }
      }
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Error />
      ) : isStartCamera ? (
        <Camera
          style={styles.camera}
          ref={(r) => {
            camera = r;
          }}
          ratio={"16:9"}
        >
          <View style={styles.cameraOuterView}>
            <View style={styles.cameraInnerView}>
              <TouchableOpacity
                onPress={takePicture}
                style={styles.cameraTouchable}
              />
            </View>
          </View>
        </Camera>
      ) : (
        <></>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  camera: {
    height: "100%",
    width: "100%",
  },
  cameraTouchable: {
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: "#fff",
  },
  cameraInnerView: {
    alignSelf: "center",
    flex: 1,
    alignItems: "center",
  },
  cameraOuterView: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    flex: 1,
    width: "100%",
    padding: 20,
    justifyContent: "space-between",
  },
});

export default CameraScreen;
