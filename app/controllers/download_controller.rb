class DownloadController < ApplicationController
  def download
    item = Item.find(params[:id])

    send_file item.path
  end
end