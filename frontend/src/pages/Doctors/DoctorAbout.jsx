import { formateDate } from '../../utils/formateDate'

function DoctorAbout() {
    return (
        <div>
            <div>
                <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2 '>
                    About of
                    <span className='text-irisBlueColor font-bold text-[24px] leading-9 '>Pankaj Bhandari</span>
                </h3>
                <p className="text_para">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere iste temporibus qui quaerat nihil minus sit, consequuntur atque vel officia non rerum laudantium eaque suscipit voluptatem impedit laborum! Eos obcaecati porro nihil facilis veritatis hic, eaque consequatur magni omnis officia laboriosam ad harum alias, quaerat placeat labore quos. Perspiciatis, velit?</p>
            </div>

            <div className='mt-12'>
                <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>Education</h3>

                <ul className='pt-4 md:p-5 '>
                    <li className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
                        <div>
                            <span 
                            className='text-irisBlueColor text-[15px] leading-6 font-semibold'>{formateDate('09-13-2014')} - {formateDate('09-13-2016')}
                            </span>
                            <p className='text-[16px] leading-6 font-medium text-textColor'>PHD in Surgery</p>
                        </div>
                        <p className='text-[14px] leading-5 font-medium text-textColor'>New Apollo Hospital, Indore</p>
                    </li>

                    <li className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
                        <div>
                            <span 
                            className='text-irisBlueColor text-[15px] leading-6 font-semibold'>{formateDate('07-04-2010')} - {formateDate('07-04-2013')}
                            </span>
                            <p className='text-[15px] leading-6 font-medium text-textColor'>PHD in Surgery</p>
                        </div>
                        <p className='text-[14px] leading-5 font-medium text-textColor'>New Apollo Hospital, Indore</p>
                    </li>
                </ul>
            </div>

            <div className='mt-12'>
            <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>Experience</h3>

            <ul className='grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5 '>
                <li className='p-4 rounded bg-[#fff9ea]'>
                    <span className='text-yellowColor text-[15px] leading-6 font-semibold'>
                        {formateDate('09-13-2014')} - 
                        {formateDate('09-13-2016')}
                    </span>
                    <p className='text-[16px] leading-6 font-medium text-textColor'>Sr. Surgeon</p>
                    <p className='text-[14px] leading-5 font-medium text-textColor'>New Apollo Hospital, Indore</p>
                </li>

                <li className='p-4 rounded bg-[#fff9ea]'>
                    <span className='text-yellowColor text-[15px] leading-6 font-semibold'>
                        {formateDate('09-13-2014')} - 
                        {formateDate('09-13-2016')}
                    </span>
                    <p className='text-[16px] leading-6 font-medium text-textColor'>Sr. Surgeon</p>
                    <p className='text-[14px] leading-5 font-medium text-textColor'>New Apollo Hospital, Indore</p>
                </li>
            </ul>
            </div>
        </div>
    )
}

export default DoctorAbout
