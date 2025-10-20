function ShopCollection () {
    return (
        <div className="flex flex-col gap-4 mx-40 my-10">
            <h2 className="text-2xl">Shop Collection</h2>

            <div className="flex gap-4 ">
                <div className="flex flex-col justify-end h-auto w-1/2 gap-4 px-4 py-4 bg-gray-200">
                    <p className="text-2xl">Title</p>
                    <a href="#" className="flex gap-1">Collection <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-right-icon lucide-move-right"><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg></a>
                </div>

                <div className="flex flex-col gap-4 w-1/2">
                    <div className="flex flex-col justify-end h-64 gap-4 px-4 py-4 bg-gray-300">
                        <p className="text-2xl">Title</p>
                        <a href="#" className="flex gap-1">Collection <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-right-icon lucide-move-right"><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg></a>
                    </div>

                    <div className="flex flex-col justify-end h-64 gap-4 px-4 py-4 bg-gray-400">
                        <p className="text-2xl">Title</p>
                        <a href="#" className="flex gap-1">Collection <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-right-icon lucide-move-right"><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg></a>
                    </div>
                </div>
            </div>

        </div>
    );
}
export default ShopCollection;