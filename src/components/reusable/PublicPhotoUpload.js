import React, {useEffect, useState} from "react";
import { Edit2  , Image} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { useFetchPublicPhoto, useUploadPublicPhoto } from "./../../hooks/useFetchPublicPhoto";
import { LoadingOverlay } from "./Loading";

const MAX_FILE_SIZE = 500 * 1024;


const PublicPhotoUpload = ({ postId }) => {
  const { userId } = useAuth();
  const formType = localStorage.getItem('formType');
  
  // Add state for the current image
  const [currentImage, setCurrentImage] = useState(null);

  const { imageUrl, isLoading, fetchPhoto } = useFetchPublicPhoto(userId, postId);
  const { uploadPublicPhoto, isUploading, uploadError } = useUploadPublicPhoto();

  // Effect to update currentImage when imageUrl changes
  useEffect(() => {
    if (imageUrl) {
      setCurrentImage(imageUrl);
    }
  }, [imageUrl]);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // CHECK FILE SIZE BEFORE UPLOADING
    if (selectedFile.size > MAX_FILE_SIZE) {
      alert("File size exceeds the maximum allowed (500 KB).");
      return;
    }

    try {
      // Upload the photo and get the response
      const result = await uploadPublicPhoto(selectedFile, "public", formType, postId);
      
      if (result.success) {
        // Update the current image immediately
        setCurrentImage(result.imageUrl);
        // Refresh the data from server
        await fetchPhoto();
      } else {
        console.error('Upload failed:', result.error);
      }
    } catch (error) {
      console.error('Error during upload:', error);
    }
  };

  if (!userId) {
    return (
      <div className="text-red-500">
        User ID not found. Please log in again.
      </div>
    );
  }

  return (
    <div className="relative">
      <img
        src={currentImage || '/where2.jpg'}
        alt="Public photo"
        className="w-full h-[400px] object-cover"
        onError={(e) => {
          e.target.src = "/where2.jpg";
        }}
      />
      <label
        htmlFor="public"
        className="absolute bottom-0 right-0 bg-white p-1 shadow-md cursor-pointer hover:bg-gray-100 transition-colors"
      >
        <Edit2 size={16} />
      </label>
      <input
        id="public"
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="loader"></div>
        </div>
      )}
      {uploadError && (
        <div className="absolute inset-x-0 bottom-0 bg-red-500 text-white text-sm py-1 px-2 text-center">
          {uploadError}
        </div>
      )}
    </div>
  );
};

export default PublicPhotoUpload;
