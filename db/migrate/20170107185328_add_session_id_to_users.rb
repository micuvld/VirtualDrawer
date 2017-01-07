class AddSessionIdToUsers < ActiveRecord::Migration[5.0]
  def self.up
	add_column :users, :session_key, :string
  end
end
