﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Unycross_Web.Context;
using Unycross_Web.Dtos;
using Unycross_Web.Models;
using Unycross_Web.Services;

namespace Unycross_Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TracksController : ControllerBase
    {
        private readonly UnycrossContext _unycrossContext;
        private readonly TrackService _trackService;
        public TracksController(UnycrossContext unycrossContext, TrackService trackService)
        {
            _unycrossContext = unycrossContext;
            _trackService = trackService;
        }

        [HttpGet]
        public IEnumerable<TrackDto> GetAllTracks()
        {
           return _trackService.GetAllTracks();
        }

        [Route("GetUserTrackFeedBack")]
        [HttpGet]
        public IEnumerable<UserTrackFeedBackDto> GetAllUserTrackFeedBack(int trackId)
        {
            return _trackService.GetAllTrackFeedBack(trackId);

        }

        [Route("UpdateUserTrackFeedBack")]
        [HttpPost, Authorize(Roles = "UnyUser")]
        public UserTrackFeedBackDto UpdateUserTrackFeedBack(int trackId, int userId, string? terrain, int? rating, string? review )
        {
            return _trackService.UpdateUserTrackFeedBack(trackId, userId, terrain, rating, review); 

        }
    }
}
