function InstagramFeed() {
    return (
        <div>
            <div className="flex flex-col items-center gap-2">
                <p className="text-1xl">NEWSFEED</p>
                <h2 className="text-2xl font-bold">Instagram</h2>
                <p className="text-1xl">Follow us on social media for more discount & promotions</p>
                <p className="text-1xl font-bold">@Smart-Hub-Official</p>
            </div>

            <div className="flex justify-center gap-8 py-8">
                <img src="insta1.jpg" className="w-56 h-56 "/>
                <img src="insta2.jpg" className="w-56 h-56 "/>
                <img src="insta3.jpg" className="w-56 h-56 "/>  
                <img src="insta4.jpg" className="w-56 h-56 "/>
            </div>
        </div>
    );
}
export default InstagramFeed;