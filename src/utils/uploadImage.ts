import firebase from '../firebaseConfig';

const uploadImageToFirebase = async (imageURI:string) => {
    try {
      const storageRef = firebase.storage().ref();
      // Generate a unique filename for the image
      const filename = `images/${Date.now()}`;
  
      // Upload the image file to Firebase Storage
      const response = await fetch(imageURI);
      const blob = await response.blob();
      const uploadTask = storageRef.child(filename).put(blob);
  
      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot:any) => {
            // Handle progress updates
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload progress: ${progress}%`);
          },
          (error:any) => {
            // Handle upload error
            console.log('Upload error:', error);
            reject(error);
          },
          () => {
            // Handle upload success
            console.log('Upload completed');
  
            // Get the public download URL of the uploaded image
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL:string) => {
              console.log('Download URL:', downloadURL);
              resolve(downloadURL);
            });
          }
        );
      });
    } catch (error) {
      console.log('Error uploading image:', error);
      throw error;
    }
  };
  
 
export default uploadImageToFirebase