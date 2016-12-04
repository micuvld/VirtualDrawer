class User < ApplicationRecord
  has_many :userToTags
  has_many :tags, :through => :userToTags
end
