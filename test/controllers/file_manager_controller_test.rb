require 'test_helper'

class FileManagerControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get file_manager_create_url
    assert_response :success
  end

  test "should get edit" do
    get file_manager_edit_url
    assert_response :success
  end

  test "should get delete" do
    get file_manager_delete_url
    assert_response :success
  end

end
