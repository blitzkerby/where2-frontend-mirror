const ContactCard = ({ title, content, variant = 'default' }) => (
    <div className={`
      bg-white rounded-xl shadow-sm border border-gray-100 
      overflow-hidden transition-all duration-200 hover:shadow-md
      ${variant === 'requirement' ? 'border-l-4 border-l-blue-500' : ''}
    `}>
      <div className="bg-white px-6 py-4 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>
      <div className={`
        p-6
        ${variant === 'requirement' ? 'prose max-w-none text-gray-700 leading-relaxed' : ''}
      `}>
        {content}
      </div>
    </div>
  );
  export default ContactCard;