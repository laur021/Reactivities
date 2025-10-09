using System;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class EditActivity
{
    public class Command : IRequest
    {
        public required Activity Activity { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities
                    .FindAsync([request.Activity.Id], cancellationToken)
                    ?? throw new Exception("Activity not found");

            context.Entry(activity).CurrentValues.SetValues(request.Activity); //suggested by chatgpt

            await context.SaveChangesAsync(cancellationToken);

        }
    }
}
