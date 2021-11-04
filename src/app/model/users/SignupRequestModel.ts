import { Calendar } from "../calendar"
class SignupRequestModel {
  public username: string = String()
  public password: number = Number()
  public email: string = String()
  public birth_date: Calendar = new Calendar
  public profile_picture: string = String()
}

export default SignupRequestModel