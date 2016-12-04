class AddPathToItems < ActiveRecord::Migration[5.0]
  def change
    add_column :items, :path, :string
  end
end
