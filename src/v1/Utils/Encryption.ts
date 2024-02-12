import bcrypt from 'bcrypt';
import dayjs from 'dayjs'


export const hash = async (password:string) => {
    const hashed_password = await bcrypt.hash(password, 12);
    return hashed_password;
  };
  
  export const verify_hash = async (password: string, hashed_password: string) => {
    const verify_password = await bcrypt.compare(password, hashed_password);
    return verify_password;
  };
  
  export const addMinutes = async (date: any, minutes: any) => {
    return new Date(date.getTime() + minutes * 60000);
  };


  export const minutesExp = (date:any, minutes:any) => {
    return new Date(date.getTime() + minutes * 60000);
  };

  //get current timestamp
   export   const  get_current_timestamp = (day = 0) => {
    let old_date = new Date();
  
    let date = new Date(old_date.setDate(old_date.getDate() + day));
  
    return dayjs(date, "YYYY-MM-DD HH:mm:ss.SSS").toDate();
  };

  export default { hash, verify_hash, addMinutes, minutesExp, get_current_timestamp };
  