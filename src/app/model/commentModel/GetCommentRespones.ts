class GetResponseCommentModel {
    public content: string = String()
    public created_at: string = Date()
    public id: number = Number()
    public owner_id: ownerDetail
    public updated_at: string = Date()
    public post_id : number = Number()
}

class ownerDetail {
    public id: number = Number()
    public username: string = String()
    public profile_picture: string = String()
}

export default GetResponseCommentModel
