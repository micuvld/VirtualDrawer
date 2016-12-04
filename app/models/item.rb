class Item < ApplicationRecord
  belongs_to :tag

  def self.insert_item_and_get_id name, tagId, username
    #new_record = new(name: name, description: "some description", tag_id: tagId, username: username)
    created_item = create(name: name, description: "some description", tag_id: tagId)
    created_item
    #upload_file params[:file], created_item.id, "username"
  end
end
