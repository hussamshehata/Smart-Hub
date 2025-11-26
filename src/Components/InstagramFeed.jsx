function InstagramFeed() {

    /*
    const posts =[
        {id:"1", image:"https://res.cloudinary.com/dbaqz7nim/image/upload/v1760885950/image_s1abl3.jpg" },
        {id:"2", image:"https://res.cloudinary.com/dbaqz7nim/image/upload/v1760885950/image_s1abl3.jpg" },
        {id:"3", image:"https://res.cloudinary.com/dbaqz7nim/image/upload/v1760885950/image_s1abl3.jpg" },
        {id:"4", image:"https://res.cloudinary.com/dbaqz7nim/image/upload/v1760885950/image_s1abl3.jpg" }
    ];
    */ 

    /*ترتيب حسب التقييم*/
    /*
    const sortedProducts =products.sort((a , b) => {
        if (b.rating !== a.rating) 
            return b.rating -a.rating ;
    })
    */
   
    return (
        <div className="mx-40 py-10">
            <div className="flex flex-col items-center gap-2">
                <p className="text-neutral-500 text-sm font-bold">NEWSFEED</p>
                <h2 className="text-neutral-700 text-2xl font-bold">Instagram</h2>
                <p className="text-neutral-700 text-1xl">Follow us on social media for more discount & promotions</p>
                <p className="text-neutral-500 text-1xl font-bold">@Smart-Hub-Official</p>
            </div>

            
        </div>
    );

        /*
            <div className="flex justify-center gap-8 w-full py-10">
                {posts.map(post =>(
                    <img key={post.id} src={post.image} className="w-1/4 h-56" />
                ))}
            </div>
        */

}
export default InstagramFeed;