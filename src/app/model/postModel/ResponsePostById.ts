class ResponsePostByIdModel {
    public content: string = String()
    public created_at: string = Date()
    public group_id: groupDetail
    public id: number = Number()
    public isLiked: boolean = Boolean()
    public owner_id: ownerDetail
    public updated_at: string = Date()
    public likeCount: number = Number()
  }

class groupDetail {
    public group_profile: string = String()
    public id: number = Number()
    public name: string = String()
}

class ownerDetail {
    public id: number = Number()
    public username: string = String()
}
  
export default ResponsePostByIdModel