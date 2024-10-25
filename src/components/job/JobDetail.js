import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompany } from "../../features/slices/jobSlice";
import { useParams } from "react-router-dom";

// import Gmail from "./../../assets/svg/gmail.svg";
// import Website from "./../../assets/svg/website.svg";
// import Telephone from "./../../assets/svg/telephone.svg";
// import Location from "./../../assets/svg/location.svg";

import IconText from "../reusable/IconText";
import DetailText from "../reusable/DetailText";
import ContactCard from "../reusable/ContactCard";
import fetchProfile from "../reusable/functions/FetchProfile";

import { 
    Mail, 
    Globe, 
    Phone, 
    MapPin,
    Building2,
    Clock,
    DollarSign,
  Briefcase,
  } from "lucide-react";

  const JobDetail = () => {
    const dispatch = useDispatch();
    const { company, isLoading, error } = useSelector(state => state.job);
    const params = useParams();
  
    useEffect(() => {
      const fetchCreatorData = async () => {
        const creatorData = await fetchProfile();
        console.log(creatorData);
      };
  
      fetchCreatorData();
      dispatch(fetchCompany(params.jobId));
    }, [dispatch, params.jobId]);
  
    if (isLoading) {
      return <LoadingSkeleton />;
    }
  
    if (error) {
      return (
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-center p-8 bg-red-50 rounded-lg">
            <p className="text-red-600 font-medium">Error loading job details: {error}</p>
            <button 
              onClick={() => dispatch(fetchCompany(params.jobId))}
              className="mt-4 px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }
  
    const jobHighlights = [
      { icon: <Clock className="w-5 h-5" />, label: "Job Type", value: company?.data?.job_type || "Part Time" },
      { icon: <DollarSign className="w-5 h-5" />, label: "Salary", value: company?.data?.salary || "Competitive" },
      { icon: <Briefcase className="w-5 h-5" />, label: "Experience", value: company?.data?.experience || "Negotiation" },
    ];
  
    const contact = (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ContactItem 
          icon={<Mail className="w-5 h-5" />}
          label="Email"
          content={company?.data?.company?.email || "N/A"}
          onClick={() => window.location.href = `mailto:${company?.data?.company?.email}`}
        />
        <ContactItem 
          icon={<Globe className="w-5 h-5" />}
          label="Website"
          content={company?.data?.company?.website_url || "N/A"}
          onClick={() => window.open(company?.data?.company?.website_url, '_blank')}
        />
        <ContactItem 
          icon={<Phone className="w-5 h-5" />}
          label="Phone"
          content={company?.data?.company?.tel || "N/A"}
          onClick={() => window.location.href = `tel:${company?.data?.company?.tel}`}
        />
        <ContactItem 
          icon={<MapPin className="w-5 h-5" />}
          label="Location"
          content={company?.data?.company?.location || "N/A"}
        />
      </div>
    );
  
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <CompanyHeader 
          name={company?.data?.company_name || "Company Name"}
          imageUrl={company?.data?.company?.img_url}
          highlights={jobHighlights}
        />
        <DetailText 
          title="Company Information"
          content={company?.data?.company?.company_bg || "N/A"}
          icon={<Building2 className="w-5 h-5" />}
        />
        <DetailText 
          title="Job Description"
          content={company?.data?.job_desc || "N/A"}
          icon={<Briefcase className="w-5 h-5" />}
        />
        <ContactCard 
          title="Job Requirements"
          content={company?.data?.job_require || "N/A"}
          variant="requirement"
        />
        <ContactCard 
          title="Contact Information"
          content={contact}
          variant="contact"
        />
      </div>
    );
  };
  
  const CompanyHeader = ({ name, imageUrl, highlights }) => (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent h-48 rounded-xl -z-10" />
      <div className="pt-8 text-center space-y-6">
        <div className="relative inline-block group">
          <div className="absolute inset-0 bg-blue-500 rounded-full opacity-0 group-hover:opacity-10 transition-opacity" />
          <img 
            src={imageUrl} 
            alt={name}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
          />
          <div className="absolute inset-0 rounded-full shadow-inner" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {highlights.map((item, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-100"
              >
                <span className="text-blue-500">{item.icon}</span>
                <div className="text-left">
                  <p className="text-xs text-gray-500">{item.label}</p>
                  <p className="text-sm font-medium text-gray-900">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  
  const ContactItem = ({ icon, label, content, onClick }) => (
    <div 
      onClick={onClick}
      className={`
        flex items-center space-x-3 p-4 rounded-lg 
        bg-white border border-gray-100 shadow-sm
        hover:bg-gray-50 hover:border-gray-200 
        transition-all duration-200
        ${onClick ? 'cursor-pointer' : ''}
      `}
    >
      <div className="text-blue-500 bg-blue-50 p-2 rounded-lg">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-gray-900 font-medium">{content}</p>
      </div>
    </div>
  );
  
  const LoadingSkeleton = () => (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-6">
        <div className="w-32 h-32 rounded-full mx-auto bg-gray-200 animate-pulse" />
        <div className="space-y-3">
          <div className="h-8 w-64 mx-auto bg-gray-200 rounded animate-pulse" />
          <div className="flex justify-center gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 w-32 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-white px-6 py-4 border-b border-gray-100">
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  export default JobDetail;
