import { Link } from "lucide-react";
import { InstagramEmbed } from "react-social-media-embed";
function InstagramFeed() {

    const InstagramUserName="@Smart-Hub-Official";
    const InstagramURL = InstagramUserName.replace("@", "");


    /*
    const posts=[
        "https://www.instagram.com/p/CXXXXXX1/",
        "https://www.instagram.com/p/CXXXXXX2/",
        "https://www.instagram.com/p/CXXXXXX3/",
        "https://www.instagram.com/p/CXXXXXX4/"
    ];
    */

    return (
        <div className="mx-40 py-10">
            <div className="flex flex-col items-center gap-2">
                {/*<p className="text-neutral-500 text-sm font-bold">NEWSFEED</p>*/}
                <h2 className="text-neutral-700 text-2xl font-bold text-center">Instagram</h2>
                <p className="text-neutral-700 text-1xl text-center">Follow us on social media for more discount & promotions</p>
                <a href={`https://www.instagram.com/${InstagramURL}/`} target="_blank" rel="noopener noreferrer" className="text-primary-600 text-1xl hover:underline font-bold ">{InstagramUserName}</a>
            </div>


            {/*
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-10">
                {posts.map((url, index) => (
                <InstagramEmbed key={index} url={url} width={280} />
                ))}
            </div>
            */}
        </div>

        
    );

}
export default InstagramFeed;