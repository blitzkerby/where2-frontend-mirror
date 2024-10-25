const DetailText = ({ title, content, icon }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md group">
      <div className="bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900">
          <span className="text-blue-500 bg-blue-50 p-2 rounded-lg group-hover:bg-blue-100 transition-colors">
            {icon}
          </span>
          {title}
        </h2>
      </div>
      <div className="p-6">
        <div className="prose max-w-none text-gray-700 leading-relaxed">
          {content}
        </div>
      </div>
    </div>
  );
  export default DetailText;