require 'test_helper'

class ViewControllerTest < ActionDispatch::IntegrationTest
  test "should get tags" do
    get view_tags_url
    assert_response :success
  end

  test "should get items" do
    get view_items_url
    assert_response :success
  end

end
