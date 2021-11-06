class ResponsePostByIdModel {
    public content: string = String()
    public created_at: string = Date()
    public group_id: number = Number()
    public id: number = Number()
    public isLiked: boolean = Boolean()
    public owner_id: number = Number()
    public updated_at: string = Date()
  }
  
export default ResponsePostByIdModel