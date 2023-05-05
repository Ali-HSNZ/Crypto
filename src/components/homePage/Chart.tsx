import TradingView from "../TradingView";

const Chart = () => {


  return (
    <section className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 font-iranyekan-bold">
      <div className="w-full col-span-12 md:col-span-8 grid-row-2 grid-cols-1">
        <div className="w-full grid sm:grid-cols-1 lg:grid-cols-2 gap-6 ">
          <div className="w-full p-6 bg-white rounded-lg">هیتوگرام</div>
          <div className="w-full p-6 bg-white rounded-lg">دایره ایی</div>
        </div>
        <div className="w-full  bg-white mt-6 rounded-lg h-[500px] p-4 ">
          {/* <TradingView/> */}
        </div>
      </div>
      <div className="bg-white rounded-lg p-4 col-span-12 md:col-span-4">محبوب ترین کوین‌ها</div>
    </section>
  );
}

export default Chart;