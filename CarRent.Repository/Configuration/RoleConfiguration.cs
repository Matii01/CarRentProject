﻿using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRent.Repository.Configuration
{
    public class RoleConfiguration : IEntityTypeConfiguration<IdentityRole>
    {
        public void Configure(EntityTypeBuilder<IdentityRole> builder)
        {
            builder.HasData(
                new IdentityRole
                {
                    Name = "User",
                    NormalizedName = "USER",
                },
                new IdentityRole
                {
                    Name = "Worker",
                    NormalizedName = "WORKER"
                }, new IdentityRole
                {
                    Name = "Administrator",
                    NormalizedName = "ADMINISTRATOR"
                },
                new IdentityRole
                {
                    Name = "UserViewer",
                    NormalizedName = "USERVIEWER",
                }
                ,
                new IdentityRole
                {
                    Name = "UserEditor",
                    NormalizedName = "USEREDITOR",
                }
                ,
                new IdentityRole
                {
                    Name = "PriceListEditor",
                    NormalizedName = "PRICELISTEDITOR",
                }
                ,
                new IdentityRole
                {
                    Name = "PageEditor",
                    NormalizedName = "PAGEEDITOR",
                },
                new IdentityRole
                {
                    Name = "CarAdd",
                    NormalizedName = "CARADD",
                }
                ,
                new IdentityRole
                {
                    Name = "CarEditor",
                    NormalizedName = "CAREDITOR",
                }
                ,
                new IdentityRole
                {
                    Name = "CarDetailsEditor",
                    NormalizedName = "CARDETAILSEDITOR",
                }
            );
        }
    }
}
