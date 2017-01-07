require 'test_helper'

class SessionControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get session_index_url
    assert_response :success
  end

  test "should get new" do
    get session_new_url
    assert_response :success
  end

  test "should get login" do
    get session_login_url
    assert_response :success
  end

end
