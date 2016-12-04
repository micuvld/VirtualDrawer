class AddItemsAssociationToChallenge < ActiveRecord::Migration[5.0]
  def self.up
	add_column :items, :tag_id, :integer
	add_index 'items', ['tag_id'], :name => 'index_tag_id'
  end

  def self.down
	remove_column :items, :tag_id
  end
end
