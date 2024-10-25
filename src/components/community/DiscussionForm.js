import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGeolocation from "./../../hooks/useGeolocation";
import ContainerComponent from "./../reusable/ContainerComponent";
import FormInput from "./../reusable/InputField";
import ButtonComponent from "./../reusable/Button";
import { MapPin } from "lucide-react";
import { useLocation } from "react-router-dom";
import { LoadingSpinner } from "./../reusable/Loading";


const DiscussionForm = ({ formData, handleChange, handleLocationChange, handleSubmit, isSubmitting, error }) => {
    const navigate = useNavigate();
    const { isGettingLocation, getLocation, error: locationError } = useGeolocation();
    const location = useLocation();

    const notDiscussionPath = location.pathname !== '/discussions';
  
    return (
        <ContainerComponent className={`${notDiscussionPath ? "w-full" : ""} rounded-md`} title="Create New Post">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
              {error}
            </div>
          )}
          <FormInput
            label="Title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title needs to be at least 10 characters long."
            required
          />
          { notDiscussionPath ? "" :           <div className="relative">
            <FormInput
              name="location"
              label="Location"
              placeholder="Click on the pin button to automatically fill in the location."
              type="text"
              value={formData.location}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <ButtonComponent
              variant="ghost"
              size="small"
              onClick={() => {
                getLocation().then((location) => handleLocationChange(location));
              }}
              disabled={isGettingLocation}
              className="absolute right-2 bottom-0 transform -translate-y-1/2"
            >
              {isGettingLocation ? (
                <LoadingSpinner size={16} />
              ) : (
                <MapPin size={20} />
              )}
            </ButtonComponent>
          </div>}
          <div className="flex-1">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 whitespace-nowrap"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Content needs to be at least 10 characters long."
              required
              className="mt-3 p-2 block w-full text-justify rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border-[2px] min-h-[200px] p-2 resize-none"
            />
          </div>
          {/* Hidden input for pathname */}
          <input
            type="hidden"
            name="pathname"
            value={formData.pathname}
          />
          <div className="flex gap-4 justify-end">
            <ButtonComponent
              variant="outline"
              onClick={() => window.location.reload()}
              className={"mt-12 w-[197px] h-[38px] sm:w-[343px] sm:h-[50px]"}
              disabled={isSubmitting}
            >
              Cancel
            </ButtonComponent>
            <ButtonComponent
              variant="primary"
              type="submit"
              className={"mt-12 w-[197px] h-[38px] sm:w-[343px] sm:h-[50px]"}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating your post..." : "Post"}
            </ButtonComponent>
          </div>
        </form>
      </ContainerComponent>
    );
  };
  
  export default DiscussionForm;