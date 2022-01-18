import {RiInstagramLine} from "react-icons/ri";
import {FaTelegramPlane} from "react-icons/fa";
import {DiAndroid} from "react-icons/di";
import {IoIosAppstore} from "react-icons/io";

const Footer = () => {
  return (
    <>
      <footer className='color-bg text-center text-white'>
        <div className='container pt-4 pb-0 d-flex align-items-center justify-content-evenly footer-items'>
					<p>تمام حقوق محفوظ است</p>
          <section className='mb-4'>

            <a className='btn text-white' href='#!'>
              <RiInstagramLine style={{fontSize: "35px"}} />
            </a>

            <a className='btn text-white' href='#!'>
              <FaTelegramPlane style={{fontSize: "35px"}} />
            </a>

            <a className='btn text-white' href='#!'>
              <DiAndroid style={{fontSize: "35px"}} />
            </a>
            <a className='btn text-white' href='#!'>
              <IoIosAppstore style={{fontSize: "35px"}} />
            </a>
          </section>
        </div>
      </footer>
    </>
  );
};
export default Footer;
