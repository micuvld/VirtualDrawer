class AddColumnTypeToItem < ActiveRecord::Migration[5.0]
  def change
 	change_table :items do |i|
		i.string :type
	end
  end
end
