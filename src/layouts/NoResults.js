const NoResults = ({errorMessage}) => {
    return (
        <div 
            className="flex flex-col items-center"
            style={{ 
                width: '100%',
                marginTop: '6.9rem'
            }}
        >
            <div className="flex justify-center items-center" style={{ width: "250px", height: "250px"}}>
                <img 
                    src="https://i.imgur.com/Qc15W5q.png"
                    alt="404 Not Found" 
                    className="object-cover"
                />
            </div>
            <h1 className="text-center" style={{ fontSize: '1.5rem' }}>{errorMessage ? (errorMessage) : "No result"}</h1>
        </div>
    )
}

export default NoResults;
