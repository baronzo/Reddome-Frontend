class CreatePostRequestModel {
    public content: string = String()
    public owner_id: string = String()
    public group_id: number = Number()
  }
  
export default CreatePostRequestModel