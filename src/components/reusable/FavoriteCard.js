import { Facebook, Instagram, Twitter, Youtube, Chrome } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { cardBody, cardTitle, cardDescription } from './tailwindcardclass/cardClass';
import EnabledMap from '../../assets/svg/EnabledMap.svg';   //map enabled
import DisabledMap from '../../assets/svg/DisabledMap.svg';   //map disabled /* please remove comment */
import BookMark from '../../assets/svg/bookmark.svg';
import Button from './ButtonComponent';
import MiniMap from '../../assets/svg/miniMap.svg'
import MiniClock from '../../assets/svg/miniClock.svg';
import Calender from '../../assets/svg/calender.svg';
import { convertToHTML } from '../../utility/markdownConverter/markdownConverter';

const FavoriteCard = ({ title, description, facebookLink, instagramLink, twitterLink, youtubeLink, websiteLink, location, deadLine, timeOut, route, type, position,salary, currency, interest, term, loan_size, size, address,price,redirect}) => {
    const socialMediaIcons = [
        { icon: Facebook, linkKey: facebookLink },
        { icon: Twitter, linkKey: twitterLink },
        { icon: Instagram, linkKey: instagramLink },
        { icon: Youtube, linkKey: youtubeLink },
        { icon: Chrome, linkKey: websiteLink, isExternal: true },
    ];
    const links = { facebookLink, twitterLink, youtubeLink, websiteLink, instagramLink };

    const workDetails = [
        { icon: MiniClock, linkKey: timeOut },
        { icon: Calender, linkKey: deadLine },
        { icon: MiniMap, linkKey: location },
    ]

    return (
        <div className="lg:h-[348px] md:w-[1100px]  mx-auto mb-[64px]">
            <div className={`${cardBody}`}>
                <div>
                    <div className="p-6 pb-0 ">
                        <h1 className={`${cardTitle}`}>{title}</h1>
                        <div className='flex justify-between w-full'>
                            <div className="flex items-center space-x-8">
                                {type === "job"?workDetails.map(({ icon , linkKey }, index) => (
                                    <div key={index} className="flex items-center text-[12px]">
                                        <img src={icon} alt={icon}/>
                                        {index !== 2 ? <p className='border-r-gray-200 border-r-2 p-1 text-nowrap'>{linkKey}</p> : <p className='text-nowrap'>{linkKey}</p>}
                                    </div>
                                )) :null}
                            </div>
                        </div>
            
            {type === "job"?  <div className="py-2">
              <p className="py-1">Position :<span> {position}</span></p>
              <p>Salary :<span> ${salary}</span></p>
            </div> : null}
            {type === "loan"? <div className="py-2">
              <p>
                Currency :<span> {currency}</span>
              </p>
              <p>
                Term:<span> {term}</span>
              </p>
              <p>
                Loan Size:<span> {loan_size}</span>
              </p>
              <p>
                Interest Rate:<span> {interest}</span>
              </p>
            </div> : null}
            {type === "accommodation"? <div className="py-2">
              <p>
                Size :<span> {size}</span>
              </p>
              <p>
                Price:<span> {price}</span>
              </p>
              <p>
                Location:<span> {address}</span>
              </p>
            </div> : null}
                            
                        
                        <div className="text-clip overflow-hidden w-full h-[200px]">
                            <p className={`${cardDescription} mt-3 text-justify`}>{convertToHTML(description)}</p>
                        </div>
                    </div>
                    <div className="p-4 pt-0 flex justify-between">
                        <div className='flex-1 content-center'>
                        <div className="social flex justify-around max-w-[200px] ">
                            {socialMediaIcons.map(({ icon: Icon, linkKey, isExternal }, index) => {
                                // if (NODE_ENV === 'development') {
                                //     console.log(linkKey)
                                // }
                                return linkKey ? (
                                    isExternal ? (
                                        <a href={linkKey} key={index} target="_blank" rel="noopener noreferrer">
                                            <Icon />
                                        </a>
                                    ) : (
                                        <Link to={linkKey} key={index}>
                                            <Icon />
                                        </Link>
                                    )
                                ) : null;
                            })}
                        </div>
                        </div>
                        <div >
                    {!redirect ? (
                <Link to={route} className="text-blue-500 hover:underline">
                <Button className="font- text-1xl p-2 px-3" variant="primary" size="large">
                    Read More
                </Button>
                </Link>
              ) : (<a href={redirect}>
                  <Button className="text-1xl p-2 px-3" variant="primary" size="large" >
                Read More
                  </Button>
                  </a>
              )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default FavoriteCard;