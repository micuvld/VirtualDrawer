class ChangeDescriptionTableNameToDetails < ActiveRecord::Migration[5.0]
  def self.up
	rename_column :items, :description, :details
  end
end
