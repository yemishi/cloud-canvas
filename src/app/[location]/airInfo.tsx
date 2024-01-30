"use server";
import { parseToCelsius } from "@/utils";

type AirInfoType = {
  feels_like: number;
  humidity: number;
  speed: number;
  deg: number;
  gust?: number;
  sea_level?: number;
};
type IconsBundleType = {
  [key in keyof AirInfoType]: React.ReactElement;
};

export default async function AirInfo(airInfo: AirInfoType) {
  const iconsBundle: IconsBundleType = {
    speed: (
      <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier"></g>
        <g id="SVGRepo_tracerCarrier"></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M8.5 3a4.002 4.002 0 0 0-3.8 2.745.5.5 0 1 1-.949-.313 5.002 5.002 0 0 1 9.654.595A3 3 0 0 1 13 12H4.5a.5.5 0 0 1 0-1H13a2 2 0 0 0 .001-4h-.026a.5.5 0 0 1-.5-.445A4 4 0 0 0 8.5 3zM0 7.5A.5.5 0 0 1 .5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm2 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-2 4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"></path>
        </g>
      </svg>
    ),
    humidity: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier"></g>
        <g id="SVGRepo_tracerCarrier"></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M15.0066 3.25608C16.8483 2.85737 19.1331 2.8773 22.2423 3.65268C22.7781 3.78629 23.1038 4.32791 22.9699 4.86241C22.836 5.39691 22.2931 5.7219 21.7573 5.58829C18.8666 4.86742 16.9015 4.88747 15.4308 5.20587C13.9555 5.52524 12.895 6.15867 11.7715 6.84363L11.6874 6.89494C10.6044 7.55565 9.40515 8.28729 7.82073 8.55069C6.17734 8.82388 4.23602 8.58235 1.62883 7.54187C1.11607 7.33724 0.866674 6.75667 1.0718 6.24513C1.27692 5.73359 1.85889 5.48479 2.37165 5.68943C4.76435 6.6443 6.32295 6.77699 7.492 6.58265C8.67888 6.38535 9.58373 5.83916 10.7286 5.14119C11.855 4.45445 13.1694 3.6538 15.0066 3.25608Z"></path>
          <path d="M22.2423 7.64302C19.1331 6.86765 16.8483 6.84772 15.0066 7.24642C13.1694 7.64415 11.855 8.44479 10.7286 9.13153C9.58373 9.8295 8.67888 10.3757 7.492 10.573C6.32295 10.7673 4.76435 10.6346 2.37165 9.67977C1.85889 9.47514 1.27692 9.72393 1.0718 10.2355C0.866674 10.747 1.11607 11.3276 1.62883 11.5322C4.23602 12.5727 6.17734 12.8142 7.82073 12.541C9.40515 12.2776 10.6044 11.546 11.6874 10.8853L11.7715 10.834C12.895 10.149 13.9555 9.51558 15.4308 9.19621C16.9015 8.87781 18.8666 8.85777 21.7573 9.57863C22.2931 9.71224 22.836 9.38726 22.9699 8.85275C23.1038 8.31825 22.7781 7.77663 22.2423 7.64302Z"></path>
          <path d="M18.9998 10.0266C18.6526 10.0266 18.3633 10.2059 18.1614 10.4772C18.0905 10.573 17.9266 10.7972 17.7089 11.111C17.4193 11.5283 17.0317 12.1082 16.6424 12.7555C16.255 13.3996 15.8553 14.128 15.5495 14.8397C15.2567 15.5213 14.9989 16.2614 14.9999 17.0117C15.0006 17.2223 15.0258 17.4339 15.0604 17.6412C15.1182 17.9872 15.2356 18.4636 15.4804 18.9521C15.7272 19.4446 16.1131 19.9674 16.7107 20.3648C17.3146 20.7664 18.0748 21 18.9998 21C19.9248 21 20.685 20.7664 21.2888 20.3648C21.8864 19.9674 22.2724 19.4446 22.5192 18.9522C22.764 18.4636 22.8815 17.9872 22.9393 17.6413C22.974 17.4337 22.9995 17.2215 22.9998 17.0107C23.0001 16.2604 22.743 15.5214 22.4501 14.8397C22.1444 14.128 21.7447 13.3996 21.3573 12.7555C20.968 12.1082 20.5803 11.5283 20.2907 11.111C20.073 10.7972 19.909 10.573 19.8382 10.4772C19.6363 10.2059 19.3469 10.0266 18.9998 10.0266ZM20.6119 15.6257C20.3552 15.0281 20.0049 14.3848 19.6423 13.782C19.4218 13.4154 19.2007 13.0702 18.9998 12.7674C18.7989 13.0702 18.5778 13.4154 18.3573 13.782C17.9948 14.3848 17.6445 15.0281 17.3878 15.6257L17.3732 15.6595C17.1965 16.0704 16.9877 16.5562 17.0001 17.0101C17.0121 17.3691 17.1088 17.7397 17.2693 18.0599C17.3974 18.3157 17.574 18.5411 17.8201 18.7048C18.06 18.8643 18.4248 19.0048 18.9998 19.0048C19.5748 19.0048 19.9396 18.8643 20.1795 18.7048C20.4256 18.5411 20.6022 18.3156 20.7304 18.0599C20.8909 17.7397 20.9876 17.3691 20.9996 17.01C21.0121 16.5563 20.8032 16.0705 20.6265 15.6597L20.6119 15.6257Z"></path>
          <path d="M14.1296 11.5308C14.8899 11.2847 15.4728 12.076 15.1153 12.7892C14.952 13.1151 14.7683 13.3924 14.4031 13.5214C13.426 13.8666 12.6166 14.3527 11.7715 14.8679L11.6874 14.9192C10.6044 15.5799 9.40516 16.3115 7.82074 16.5749C6.17735 16.8481 4.23604 16.6066 1.62884 15.5661C1.11608 15.3615 0.866688 14.7809 1.07181 14.2694C1.27694 13.7578 1.8589 13.509 2.37167 13.7137C4.76436 14.6685 6.32297 14.8012 7.49201 14.6069C8.67889 14.4096 9.58374 13.8634 10.7286 13.1654C11.8166 12.5021 12.9363 11.9171 14.1296 11.5308Z"></path>
        </g>
      </svg>
    ),
    deg: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier"></g>
        <g id="SVGRepo_tracerCarrier"></g>
        <g id="SVGRepo_iconCarrier">
          <path d="m13.983 11.186 1.482-2.65-2.63 1.482-.814-2.922-.814 2.922-2.651-1.482 1.461 2.65-2.922.814 2.922.814-1.482 2.651 2.65-1.482.814 2.922.814-2.922 2.65 1.482-1.482-2.63 2.922-.814zm-1.148.981c0 .021-.021.042-.021.062s-.021.062-.021.08c-.021.021-.021.042-.042.08-.021.021-.021.042-.042.062-.023.04-.049.074-.08.104l-.021.021c-.042.042-.08.062-.126.104-.021.021-.042.021-.062.042s-.049.035-.079.041h-.001c-.02.013-.044.021-.07.021-.004 0-.007 0-.011 0-.021 0-.062.021-.08.021-.042 0-.08.021-.126.021h-.08c-.006.001-.013.001-.021.001-.038 0-.074-.008-.106-.022l.002.001c-.021 0-.062-.021-.08-.021s-.062-.021-.08-.021c-.021-.021-.062-.021-.08-.042s-.042-.021-.062-.042c-.048-.029-.089-.064-.125-.104l-.021-.021c-.042-.042-.062-.08-.104-.126-.021-.021-.021-.042-.042-.062s-.021-.062-.042-.08c-.013-.02-.021-.044-.021-.07 0-.004 0-.007 0-.011 0-.021-.021-.042-.021-.062-.013-.05-.021-.108-.021-.167s.008-.117.022-.172l-.001.005c0-.021.021-.042.021-.062 0-.042.021-.062.042-.104 0-.021.021-.042.021-.062.021-.021.021-.062.042-.08.025-.022.046-.049.062-.078l.001-.002c.042-.042.062-.08.104-.104.021-.021.042-.042.062-.042.042-.021.062-.042.104-.062.021 0 .021-.021.042-.021.042-.021.08-.021.126-.042h.042c.05-.013.108-.021.167-.021s.117.008.172.022l-.005-.001c.021 0 .042.021.062.021.042 0 .062.021.104.042.021.021.042.021.08.042.021.021.042.021.062.042.09.063.167.139.228.227l.002.003c.021.021.021.042.042.062s.035.049.041.079v.001c.013.02.021.044.021.07v.011c0 .021.021.042.021.08.014.042.022.09.022.139 0 .01 0 .02-.001.029v-.001c.001.01.001.022.001.035 0 .048-.008.095-.024.138l.001-.003z"></path>
          <path d="m11.604 5.823c0-.313 0-.606-.021-.856.104.23.23.48.334.689l.418.751h.459v-1.962h-.418v.584c-.001.045-.002.097-.002.15 0 .234.016.465.047.69l-.003-.026c-.108-.27-.213-.489-.33-.702l.017.034-.418-.73h-.522v1.962h.418v-.584z"></path>
          <path d="m6.094 11.833c-.042.23-.08.459-.104.689-.021-.23-.062-.438-.104-.668l-.171-.834h-.48l-.16.814c-.042.25-.104.48-.126.689-.042-.209-.08-.459-.126-.689l-.149-.814h-.48l.459 1.962h.48l.188-.856c.041-.166.078-.372.102-.581l.002-.024c.021.23.062.418.08.606l.167.856h.48l.501-1.962h-.4z"></path>
          <path d="m19.054 12.146h.71v-.354h-.71v-.418h.751v-.355h-1.21v1.962h1.252v-.354h-.793z"></path>
          <path d="m12.166 18.511c-.25-.104-.376-.146-.376-.271 0-.104.08-.188.292-.188.151.006.294.035.428.083l-.01-.003.104-.354c-.148-.06-.319-.098-.498-.104h-.003c-.459 0-.751.25-.751.584 0 .292.209.459.542.584.23.08.334.146.334.271s-.104.209-.313.209c-.184-.004-.357-.05-.51-.128l.007.003-.08.376c.16.079.348.126.546.126h.014-.001c.542 0 .793-.271.793-.606.007-.268-.163-.456-.518-.582z"></path>
          <path d="m12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12c-.009-6.624-5.376-11.991-11.999-12zm10.059 13.106c-.534 4.693-4.205 8.386-8.842 8.948l-.049.005-1.169-2.025-1.169 2.024c-4.67-.57-8.331-4.238-8.886-8.862l-.005-.048 1.962-1.148-1.962-1.127c.559-4.672 4.221-8.341 8.841-8.906l.049-.005 1.169 2.025 1.169-2.024c4.685.567 8.356 4.259 8.886 8.905l.004.047-1.899 1.106z"></path>
        </g>
      </svg>
    ),
    gust: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier"></g>
        <g id="SVGRepo_tracerCarrier"></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M2 15H18.5C20.43 15 22 16.57 22 18.5C22 20.43 20.43 22 18.5 22C16.57 22 15 20.43 15 18.5V18"
            stroke="#ffffff"
          ></path>
          <path
            d="M2 12H18.5C20.42 12 22 10.43 22 8.5C22 6.58 20.42 5 18.5 5C16.58 5 15 6.57 15 8.5V9"
            stroke="#ffffff"
          ></path>
          <path
            d="M2 9H9.31C10.8 9 12 7.79 12 6.31C12 4.82 10.79 3.62 9.31 3.62C7.82 3.62 6.62 4.83 6.62 6.31V6.69"
            stroke="#ffffff"
          ></path>
        </g>
      </svg>
    ),
    sea_level: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier"></g>
        <g id="SVGRepo_tracerCarrier"></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M3 6L6.10557 4.44721C6.66863 4.16569 7.33137 4.16569 7.89443 4.44721L9.31672 5.15836C11.0059 6.00294 12.9941 6.00294 14.6833 5.15836L16.1056 4.44721C16.6686 4.16569 17.3314 4.16569 17.8944 4.44721L21 6M3 10.5L6.10557 8.94721C6.66863 8.66569 7.33137 8.66569 7.89443 8.94721L9.31672 9.65836C11.0059 10.5029 12.9941 10.5029 14.6833 9.65836L16.1056 8.94721C16.6686 8.66569 17.3314 8.66569 17.8944 8.94721L21 10.5M3 15L6.10557 13.4472C6.66863 13.1657 7.33137 13.1657 7.89443 13.4472L9.31672 14.1584C11.0059 15.0029 12.9941 15.0029 14.6833 14.1584L16.1056 13.4472C16.6686 13.1657 17.3314 13.1657 17.8944 13.4472L21 15M3 19.5L6.10557 17.9472C6.66863 17.6657 7.33137 17.6657 7.89443 17.9472L9.31672 18.6584C11.0059 19.5029 12.9941 19.5029 14.6833 18.6584L16.1056 17.9472C16.6686 17.6657 17.3314 17.6657 17.8944 17.9472L21 19.5"
            stroke="#ffffff"
          ></path>
        </g>
      </svg>
    ),
    feels_like: (
      <svg viewBox="0 0 32 32" id="Layer_1" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier"></g>
        <g id="SVGRepo_tracerCarrier"></g>
        <g id="SVGRepo_iconCarrier">
          <defs> </defs>
          <path d="M26,30H22a2.0059,2.0059,0,0,1-2-2V21a2.0059,2.0059,0,0,1-2-2V13a2.9465,2.9465,0,0,1,3-3h6a2.9465,2.9465,0,0,1,3,3v6a2.0059,2.0059,0,0,1-2,2v7A2.0059,2.0059,0,0,1,26,30ZM21,12a.9448.9448,0,0,0-1,1v6h2v9h4V19h2V13a.9448.9448,0,0,0-1-1Z"></path>
          <path d="M24,9a4,4,0,1,1,4-4h0A4.0118,4.0118,0,0,1,24,9Zm0-6a2,2,0,1,0,2,2h0a2.0059,2.0059,0,0,0-2-2Z"></path>
          <path d="M10,20.1839V12H8v8.1839a3,3,0,1,0,2,0Z"></path>
          <path d="M9,30A6.9931,6.9931,0,0,1,4,18.1108V7A5,5,0,0,1,14,7V18.1108A6.9931,6.9931,0,0,1,9,30ZM9,4A3.0033,3.0033,0,0,0,6,7V18.9834l-.332.2983a5,5,0,1,0,6.664,0L12,18.9834V7A3.0033,3.0033,0,0,0,9,4Z"></path>
          <rect id="_Transparent_Rectangle_"></rect>
        </g>
      </svg>
    )
  };

  const formattedInfo = (element: string, value: number): string => {
    switch (element) {
      case "deg":
        return `${value}°`;

      case "feels_like":
        return `${parseToCelsius(value)}°c`;

      case "gust":
        return `${value.toFixed(1)}m/s`;
      case "humidity":
        return `${value}%`;

      case "speed":
        return `${value.toFixed(1)}m/s`;
      case "sea_level":
        return `${value}hPa`;
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col backdrop-brightness-125 backdrop-blur p-3 rounded-[35px] border-white border-2 border-opacity-20 ">
      <span className="flex items-center p-2 gap-1 font-merriWeather font-bold">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-11"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier"></g>
          <g id="SVGRepo_tracerCarrier"></g>
          <g id="SVGRepo_iconCarrier">
            <circle cx="12" cy="18" r="1" fill="#ffffff"></circle>
            <circle cx="12" cy="21" r="1" fill="#ffffff"></circle>
            <path
              d="M16 19.5C16 20.0523 15.5523 20.5 15 20.5C14.4477 20.5 14 20.0523 14 19.5C14 18.9477 14.4477 18.5 15 18.5C15.5523 18.5 16 18.9477 16 19.5Z"
              fill="#ffffff"
            ></path>
            <path
              d="M16 16.5C16 17.0523 15.5523 17.5 15 17.5C14.4477 17.5 14 17.0523 14 16.5C14 15.9477 14.4477 15.5 15 15.5C15.5523 15.5 16 15.9477 16 16.5Z"
              fill="#ffffff"
            ></path>
            <path
              d="M10 19.5C10 20.0523 9.55228 20.5 9 20.5C8.44772 20.5 8 20.0523 8 19.5C8 18.9477 8.44772 18.5 9 18.5C9.55228 18.5 10 18.9477 10 19.5Z"
              fill="#ffffff"
            ></path>
            <path
              d="M10 16.5C10 17.0523 9.55228 17.5 9 17.5C8.44772 17.5 8 17.0523 8 16.5C8 15.9477 8.44772 15.5 9 15.5C9.55228 15.5 10 15.9477 10 16.5Z"
              fill="#ffffff"
            ></path>
            <path
              d="M22 13.3529C22 15.6958 20.5562 17.7055 18.5 18.5604M14.381 8.02721C14.9767 7.81911 15.6178 7.70588 16.2857 7.70588C16.9404 7.70588 17.5693 7.81468 18.1551 8.01498M7.11616 10.6089C6.8475 10.5567 6.56983 10.5294 6.28571 10.5294C3.91878 10.5294 2 12.4256 2 14.7647C2 16.6611 3.26124 18.2664 5 18.8061M7.11616 10.6089C6.88706 9.9978 6.7619 9.33687 6.7619 8.64706C6.7619 5.52827 9.32028 3 12.4762 3C15.4159 3 17.8371 5.19371 18.1551 8.01498M7.11616 10.6089C7.68059 10.7184 8.20528 10.9374 8.66667 11.2426M18.1551 8.01498C19.0446 8.31916 19.8345 8.83436 20.4633 9.5"
              stroke="#ffffff"
            ></path>
          </g>
        </svg>
        <p>Air Quality</p>
      </span>

      <div className="grid gap-x-7 gap-y-4 p-2 grid-cols-3 w-full">
        {Object.keys(airInfo).length > 0 &&
          airInfo &&
          Object.keys(airInfo).map((key, index) => {
            const title: keyof AirInfoType = key as keyof AirInfoType;
            const element = airInfo[title];
            return (
              <div
                key={`${key}_${index}`}
                className="flex gap-1 items-center font-lato text-sm"
              >
                <span className="w-8 fill-white"> {iconsBundle[title]}</span>
                <span className="flex flex-col">
                  <p className="text-gray-300">{title.replace("_"," ")}</p>
                  <p>{element ? formattedInfo(title, element) : "???"}</p>
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
}
