class Tag < ApplicationRecord
  has_many :items
  has_many :userToTags
  has_many :users, :through => :userToTags
end
