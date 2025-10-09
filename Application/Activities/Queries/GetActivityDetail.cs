using System;
using System.Data.Common;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityDetail
{
    public class Query : IRequest<Activity>
    { 
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Activity>
    {
        public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
        {
            //need ienclose sa [] ang keyvalue kasi merong isa pang parameter na cancellationtoken
            var activity = await context.Activities
                    .FindAsync([request.Id], cancellationToken)
                    ?? throw new Exception("Activity not found");

            return activity;


        }
    }
}
