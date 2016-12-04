require 'test_helper'

class FileUploaderControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get file_uploader_new_url
    assert_response :success
  end

  test "should get create" do
    get file_uploader_create_url
    assert_response :success
  end

end
