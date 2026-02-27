export const EditProductFirstStep = () => {
    return (
        <div className='flex flex-col gap-5'>
            <h1 className='text-xl font-bold'>مرحله اول</h1>
            <p className='text-gray-500'>اطلاعات پایه</p>
            <div className='flex gap-5'>
                <div className='flex flex-col gap-2'>
                    <label className='text-gray-500'>نام محصول</label>
                    <input type='text' className='border border-gray-300 p-2 rounded' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-gray-500'>قیمت</label>
                    <input type='number' className='border border-gray-300 p-2 rounded' />
                </div>
            </div>
            <div className='flex gap-5'>
                <div className='flex flex-col gap-2'>
                    <label className='text-gray-500'>دسته بندی</label>
                    <select className='border border-gray-300 p-2 rounded'>
                        <option value=''>انتخاب کنید</option>
                        <option value='1'>مردانه</option>
                        <option value='2'>زنانه</option>
                    </select>
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-gray-500'>زیر دسته</label>
                    <select className='border border-gray-300 p-2 rounded'>
                        <option value=''>انتخاب کنید</option>
                        <option value='1'>مردانه</option>
                        <option value='2'>زنانه</option>
                    </select>
                </div>
            </div>
            <div className='flex gap-5'>
                <div className='flex flex-col gap-2'>
                    <label className='text-gray-500'>برند</label>
                    <select className='border border-gray-300 p-2 rounded'>
                        <option value=''>انتخاب کنید</option>
                        <option value='1'>مردانه</option>
                        <option value='2'>زنانه</option>
                    </select>
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-gray-500'>تصویر شاخص</label>
                    <input type='file' className='border border-gray-300 p-2 rounded' />
                </div>
            </div>
            <div className='flex gap-5'>
                <div className='flex flex-col gap-2'>
                    <label className='text-gray-500'>توضیحات</label>
                    <textarea className='border border-gray-300 p-2 rounded' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-gray-500'>قابلیت ها</label>
                    <textarea className='border border-gray-300 p-2 rounded' />
                </div>
            </div>
        </div>
    )
}
