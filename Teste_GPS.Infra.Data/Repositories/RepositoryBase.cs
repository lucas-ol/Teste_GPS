using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Teste_GPS.Infra.Data.Contexto;

namespace Teste_GPS.Infra.Data.Repositories
{
    public abstract class RepositoryBase<TEntity> : IDisposable, Domain.Interfaces.IRepositoryBase<TEntity> where TEntity : class
    {
        public void Add(TEntity obj)
        {
            using (var ctx = new GPSContext())
            {
                ctx.Set<TEntity>().Add(obj);
                ctx.SaveChanges();
            }
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        public IEnumerable<TEntity> GetAll(int QTDE)
        {
            using (var ctx = new GPSContext())
            {
                return ctx.Set<TEntity>().AsNoTracking().Take(QTDE).ToList();
            }
        }
        public IEnumerable<TEntity> GetAll()
        {
            using (var ctx = new GPSContext())
            {
                return ctx.Set<TEntity>().AsNoTracking().ToList();
            }
        }
        public TEntity GetById(int id)
        {
            using (var ctx = new GPSContext())
            {
                return ctx.Set<TEntity>().Find(id);
            }
        }

        public void Remove(TEntity obj)
        {
            using (var ctx = new GPSContext())
            {
                ctx.Set<TEntity>().Remove(obj);
            }
        }

        public void Update(TEntity obj)
        {
            using (var ctx = new GPSContext())
            {
                ctx.Entry(obj).State = System.Data.Entity.EntityState.Modified;
                ctx.SaveChanges();
            }
        }

    }
}
