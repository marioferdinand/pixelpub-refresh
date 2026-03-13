const Footer = () => {
  return (
    <footer className="border-t border-border py-8">
      <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
        <p>© {new Date().getFullYear()} Coach Fema. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
